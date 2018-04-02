package adapter

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"path"
	"strings"
	"time"

	"github.com/parnurzeal/gorequest"
)

const (
	defaultTypeName = "doc"
)

func createRequest() *gorequest.SuperAgent {
	request := gorequest.New().Timeout(5 * time.Second)
	return request.Set("Content-Type", "application/json")
}

func getRequest(uri string, payload interface{}, v interface{}) (gorequest.Response, []byte, []error) {
	return createRequest().
		Get(uri).
		Send(payload).
		EndStruct(v)
}

func postRequest(uri string, payload interface{}, v interface{}) (gorequest.Response, []byte, []error) {
	return createRequest().
		Post(uri).
		Send(payload).
		EndStruct(v)
}

type Client struct {
	uri string
}
type ElasticMapping struct {
}

type ElasticSearchQuery struct {
	Match interface{} `json:"match,omitempty"`
	Exits *struct {
		Field string `json:"field,omitempty"`
	} `json:"exits,omitempty"`
}

type ElasticSearchPayload struct {
	Query ElasticSearchQuery `json:"query"`
	From  int                `json:"from,omitempty"`
	Size  int                `json:"size,omitempty"`
}

type ElasticResponseDocument struct {
	Index  string      `json:"_index"`
	Type   string      `json:"_type"`
	ID     string      `json:"_id"`
	Score  float32     `json:"_score"`
	Source interface{} `json:"_source"`
}

type ElasticResponseHits struct {
	Total int                       `json:"total"`
	Hits  []ElasticResponseDocument `json:"hits"`
}

func (b *ElasticResponseHits) BindHits(v interface{}) error {
	s, err := json.Marshal(b.Hits)
	// fmt.Println(string(s))
	if err != nil {
		return fmt.Errorf("[elastic] %s", err)
	}
	err = json.Unmarshal(s, v)
	if err != nil {
		return fmt.Errorf("[elastic] %s", err)
	}
	return nil
}

type ElasticResponseBody struct {
	Took   int                 `json:"took,omitempty"`
	Items  []interface{}       `json:"items,omitempty"`
	Errors bool                `json:"errors"`
	Error  interface{}         `json:"error,omitempty"`
	Hits   ElasticResponseHits `json:"hits"`
}

// Search send search instruction to elastic server
// and return raw data
func (c *Client) Search(IndexName string, payload ElasticSearchPayload) (ElasticResponseBody, error) {
	var result ElasticResponseBody
	u, _ := url.Parse(c.uri)

	u.Path = path.Join(u.Path, IndexName, defaultTypeName, "_search")

	s, err := json.Marshal(payload)
	if err != nil {
		return result, fmt.Errorf("[elastic] search query error %s", err)
	}
	fmt.Printf("[elastic] search with query %s \n", s)

	resp, _, errs := postRequest(u.String(), payload, &result)

	if errs != nil {
		return result, errs[0]
	}

	if result.Errors {
		return result, errors.New("[elastic] search result contain errors")
	}

	if resp.StatusCode >= 400 {
		return result, fmt.Errorf("[elastic] error with code %d", resp.StatusCode)
	}

	return result, nil

}

func (c *Client) Insert(indexName string, id string, v interface{}) error {

	jsonData, err := json.Marshal(v)
	if err != nil {
		return err
	}

	var result ElasticResponseBody
	u, _ := url.Parse(c.uri)

	u.Path = path.Join(u.Path, indexName, defaultTypeName, indexName)
	resp, b, errs := postRequest(u.String(), string(jsonData), &result)
	fmt.Println(string(b))
	if len(errs) > 0 {
		return errs[0]
	}
	if resp.StatusCode >= 400 {
		return fmt.Errorf("[elastic] error with code %d", resp.StatusCode)
	}

	fmt.Printf("[elastic] insert complete, took %d ms ", result.Took)
	return nil

}

// Update call document update api
func (c *Client) Update(indexName string, id string, v interface{}) error {

	jsonData, err := json.Marshal(v)
	if err != nil {
		return err
	}

	var result ElasticResponseBody
	u, _ := url.Parse(c.uri)

	u.Path = path.Join(u.Path, indexName, defaultTypeName, indexName, "_update")
	resp, _, errs := postRequest(u.String(), string(jsonData), &result)
	if len(errs) > 0 {
		return errs[0]
	}
	if resp.StatusCode >= 400 {
		return fmt.Errorf("[elastic] error with code %d", resp.StatusCode)
	}

	fmt.Printf("[elastic] update complete, took %d ms ", result.Took)
	return nil

}

type ElasticError struct {
	Type     string        `json:"type"`
	Reason   string        `json:"reason"`
	CausedBy *ElasticError `json:"caused_by,omitempty"`
}

type ElasticBulkInstruction struct {
	Index *struct {
		Index string `json:"_index,omitempty"`
		Type  string `json:"_type,omitempty"`
		ID    string `json:"_id,omitempty"`
	} `json:"index,omitempty"`

	Doc interface{} `json:"doc,omitempty"`
}

func createBulkPayloadFromInstructions(s []ElasticBulkInstruction) string {
	payload := []string{}
	for _, instruction := range s {
		b, _ := json.Marshal(instruction)
		payload = append(payload, string(b))
	}
	return strings.Join(payload[:], "\n") + "\n"
}

// Bulk send bulk command to elastic
// payload must be instruction list
// split by newline (\n)
func (c *Client) Bulk(payload string) error {

	u, _ := url.Parse(c.uri)
	u.Path = path.Join(u.Path, "_bulk")

	var result ElasticResponseBody
	j := []byte(payload)

	req, err := http.NewRequest("POST", u.String(), bytes.NewBuffer(j))
	req.Header.Set("Content-Type", "application/x-ndjson")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return err
	}

	defer resp.Body.Close()

	body, _ := ioutil.ReadAll(resp.Body)
	json.Unmarshal(body, &result)

	if resp.StatusCode >= 400 {
		fmt.Println(string(string(body)))
		return (fmt.Errorf("[elastic] bulk request reponse %d", resp.StatusCode))
	}
	if result.Errors {
		return errors.New("there is error occur")
	}
	fmt.Printf("[elastic] bulk complete, took %d ms ", result.Took)

	return nil
}

type ElasticHeathCheckBody struct {
	Name    string `json:"name"`
	Version struct {
		Number string `json:"number"`
	} `json:"version"`
}

func Dial(uri string) Client {
	payload := map[string]string{}

	var heathCheckResponse ElasticHeathCheckBody
	resp, _, errs := getRequest(uri, payload, &heathCheckResponse)

	if len(errs) > 0 {
		log.Fatal(errs[0])
	}

	if resp.StatusCode > 400 {
		fmt.Printf("[elastic] elastic return %d", resp.StatusCode)
		log.Fatal("[elastic] health check to elastic fail")
	}

	if heathCheckResponse.Version.Number != "6.1.3" {
		log.Fatalf("[elastic] elastic server version do not match 6.1.3 (%s)", heathCheckResponse.Version.Number)
	}

	fmt.Println("[elastic] Connected !!")
	return Client{
		uri: uri,
	}

}

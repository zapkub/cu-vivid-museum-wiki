package adapter

import (
	"encoding/json"
	"fmt"
	"testing"
)

func TestDial(t *testing.T) {
	Dial("http://localhost:9200")
}

func TestSearch(t *testing.T) {
	c := Dial("http://localhost:9200")

	q := ElasticSearchQuery{}
	q.Exits.Field = "title"

	_, err := c.Search("1234h", q)
	if err != nil {
		t.Fatalf("search error %s", err)
	}

}
func TestBulkFactory(t *testing.T) {

	instruction1 := "{\"index\":{\"_index\":\"1234h\",\"_type\":\"doc\",\"_id\":\"bbb1234\"}}"
	instruction2 := "{\"doc\":{\"title\":\"testing-1\"}}"

	i := []byte(instruction1)
	j := []byte(instruction2)

	var index ElasticBulkInstruction
	err := json.Unmarshal(i, &index)
	if err != nil {
		t.Fatalf("JSON parse error\n%s", err)
	}

	var doc ElasticBulkInstruction
	err = json.Unmarshal(j, &doc)
	if err != nil {
		t.Fatalf("JSON parse error\n%s", err)
	}

	operations := []ElasticBulkInstruction{
		index,
		doc,
	}
	r := createBulkPayloadFromInstructions(operations)

	expect := instruction1 + "\n" + instruction2
	if r != expect {
		fmt.Println(index.Doc)
		t.Fatalf("Bulk instruction factory output is invalid\n(result)\n%s\n(expect)\n%s", r, expect)
	}

}

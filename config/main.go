package config

import (
	"flag"
	"io/ioutil"
	"log"
	"sync"

	yaml "gopkg.in/yaml.v2"
)

func getConfig(configPath string, outConfig interface{}) {

	log.Print("[config] create config file")
	// read service whitelist yaml
	b, err := ioutil.ReadFile(configPath)
	if err != nil {
		log.Fatalf("No %s found", configPath)
	}

	err = yaml.Unmarshal(b, outConfig)

	if err != nil {
		log.Fatal(err)
	}
}

// Config main config object
type Config struct {
	Port          string `yaml:"port"`
	ClientPort    string `yaml:"clientPort"`
	ElasticURI    string `yaml:"elasticURI"`
	IndexName     string `yaml:"indexName"`
	IsDevelopment bool
	CorsWhiteList []string `yaml:"corsWhiteList"`
	Secret        string   `yaml:"secret"`
}

var config Config
var once sync.Once

// LoadConfig read config file from path and
// return config file
// *** config with load only once on application start ***
func LoadConfig() *Config {

	once.Do(func() {
		configPath := flag.String("config", "./config.yaml", "path of config.yaml to use with service")
		isProd := flag.Bool("production", false, "is production?")
		flag.Parse()
		getConfig(*configPath, &config)
		config.IsDevelopment = !*isProd
		log.Println(config)
	})
	return &config
}

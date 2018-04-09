package graphql

import (
	"cu-vivid-museum-wiki/config"
	"fmt"
	"net/http"

	jwtmiddleware "github.com/auth0/go-jwt-middleware"
	jwt "github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

// UserSession graphql User session shape
type UserSession struct {
	id string
}

func createJWTMiddleware(c *config.Config) gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Next()
	}
}

func createJWTAuthentication(c *config.Config) *jwtmiddleware.JWTMiddleware {
	return jwtmiddleware.New(jwtmiddleware.Options{
		ValidationKeyGetter: func(token *jwt.Token) (interface{}, error) {
			return []byte(c.Secret), nil
		},

		ErrorHandler: func(w http.ResponseWriter, r *http.Request, err string) {
			fmt.Println(err)
		},
		SigningMethod: jwt.SigningMethodHS256,
	})
	// return &jwt.GinJWTMiddleware{
	// 	Realm:   "test",
	// 	Key:     []byte(config.Secret),
	// 	Timeout: time.Hour * 24 * 30,
	// 	Authenticator: func(username string, password string, c *gin.Context) (string, bool) {

	// 		return "", false
	// 	},
	// 	Authorizator: func(userId string, c *gin.Context) bool {
	// 		fmt.Println(userId)
	// 		return true
	// 	},
	// 	Unauthorized: func(c *gin.Context, code int, message string) {
	// 		fmt.Println(message)
	// 		c.JSON(code, gin.H{
	// 			"code":    code,
	// 			"message": message,
	// 		})
	// 	},
	// 	TokenLookup:   "header:Authorization",
	// 	TokenHeadName: "Bearer",
	// 	TimeFunc:      time.Now,
	// }

}

rm -rf ./gen/$1 && \
  npx @openapitools/openapi-generator-cli generate \
  -i api.yaml -g $1 -o ./gen/$1

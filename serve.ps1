<#
  Runs compose serve using the environment variables contained in .env
  Create a .env file in the project root that contains:

  CLIENT_ID=<your client id>
  CLIENT_SECRET=<your client secret>
  BASE_URL=<base url to Chorus REST API e.g. https://staging.dev.dcbel.energy>
  TOKEN_URL=<url to toekn endpoint e.g. https://login.microsoftonline.com/bd68c26a-cb93-47ca-88d7-bff52fcdde0c/oauth2/v2.0/token>
  SCOPE=<scope e.g. https://staging.dev.dcbel.energy/.default>

#>
Get-Content $PWD\.env | ForEach-Object {
  $name, $value = $_.split('=')
  Set-Content env:\$name $value
}
composer serve

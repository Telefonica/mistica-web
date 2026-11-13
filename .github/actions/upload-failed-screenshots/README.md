# Upload failed screenshots action

This action uploads failed screenshots to azure

## Inputs

### `github-token`

**Required** GitHub token, required to comment on PRs

### `azure-account-name`

**Required** Azure Account Name

### `azure-account-key`

**Required** Azure Account Key

### `glob`

Glob to match diff image files

Defaults to `reports/playwright/**/*-diff.png`

## Outputs

### `uploads`

List of uploaded images: Array<{filename: string, url: string}>

## Example usage

```yaml
uses: './.github/actions/upload-failed-screenshots'
if: always()
with:
  azure-account-name: ${{ secrets.AZURE_ACCOUNT_NAME }}
  azure-account-key: ${{ secrets.AZURE_ACCOUNT_KEY }}
  glob: 'reports/playwright/**/*-diff.png'
```

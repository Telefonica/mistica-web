# Upload failed screenshots action

This action uploads failed screenshots to azure

## Inputs

### `azure-account-name`

**Required** Azure Account Name

### `azure-account-key`

**Required** Azure Account Key

### `glob`

Glob to match diff image files

Defaults to `**/__diff_output__/*-diff.png`

## Outputs

### `uploads`

List of uploaded images: Array<{filename: string, url: string}>

## Example usage

```yaml
uses: './.github/actions/upload-failed-screenshots'
if: failure()
with:
  azure-account-name: ${{ secrets.AZURE_ACCOUNT_NAME }}
  azure-account-key: ${{ secrets.AZURE_ACCOUNT_KEY }}
  glob: '**/__diff_output__/*-diff.png'
```

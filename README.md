# Arch Linux Rebuilderd Status

A simple status display with the number of reproducible packages for Arch
Linux. Uses rebuilderd's API to fetch the current status of reproducibility.

## Dependencies

* npm (for building/development)
* caddy (for local development)

## Development

```
npm run watch
```

## Building

```
npm install
npm run build
```

The build files are located in the 'dist' directory.

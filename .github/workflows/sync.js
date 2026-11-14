name: Gastronaut Sync

on:
  schedule:
    # Beží každých 30 minút od 7:00 do 23:59 UTC (8:00 ráno do 1:00 v noci nášho času)
    - cron: '*/30 7-23 * * *'
  workflow_dispatch:

jobs:
  run-sync:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '24'

      - name: Install dependencies
        run: |
          npm install
          npx playwright install --with-deps chromium

      - name: Run script
        env:
          GASTRONAUT_EMAIL: ${{ secrets.GASTRONAUT_EMAIL }}
          GASTRONAUT_PASSWORD: ${{ secrets.GASTRONAUT_PASSWORD }}
          SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
          SUPABASE_KEY: ${{ secrets.SUPABASE_KEY }}
        run: node sync.js

# Cucumber Acceptance tests:

## To run the tests:
`npm run cucumber`

## Adding new tests:

- Add feature file to src/features/scenarios
- Define steps for added scenario by adding a file in steps 
  - e.g: `decid001.js` defines steps for `Create_Decision_Table.feature`
- Steps shared by different scenarios are defined in `commonSteps.js`
- Any utility logic that may be shared between multiple files to be added in `TestUtils.js`

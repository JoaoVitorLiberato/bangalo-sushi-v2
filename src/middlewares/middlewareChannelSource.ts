export function dataSource (): Promise<string[]> {
  return fetch("/data/analytics/analyticsChannel.json")
    .then(response => response.json())
    .then(responseItems => {
      return responseItems
    })
}

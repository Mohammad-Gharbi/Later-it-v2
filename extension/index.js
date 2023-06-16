browser.tabs.onUpdated.addListener(function (tabId, changeInfo) {
  if (changeInfo.status === "loading") {
    const articleUrl = changeInfo.url
    console.log(articleUrl)
    browser.browserAction.onClicked.addListener(() => {
      postData(articleUrl)
    })
  }
})

async function postData(articleUrl) {
  const rawResponse = await fetch(
    "https://later-it.vercel.app/api/addArticle",
    {
      method: "POST",
      body: JSON.stringify({ articleUrl }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  )

  return rawResponse
}

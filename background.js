chrome.action.onClicked.addListener(async (tab) => {
  try {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        if (navigator.share) {
          navigator
            .share({
              title: document.title,
              url: window.location.href,
            })
            .catch((error) => {
              if (error.name === "AbortError") {
                return;
              }

              if (navigator.clipboard) {
                navigator.clipboard
                  .writeText(window.location.href)
                  .then(() => {
                    alert(
                      "Sharing failed, but URL has been copied to clipboard"
                    );
                  })
                  .catch(() => {
                    alert("Sharing failed and unable to copy to clipboard");
                  });
              } else {
                alert("Sharing failed and clipboard not available");
              }
            });
        } else {
          if (navigator.clipboard) {
            navigator.clipboard
              .writeText(window.location.href)
              .then(() => {
                alert(
                  "Native sharing not supported, but URL has been copied to clipboard"
                );
              })
              .catch(() => {
                alert(
                  "Native sharing not supported and unable to copy to clipboard"
                );
              });
          } else {
            alert(
              "Browser not compatible with native sharing and clipboard not available"
            );
          }
        }
      },
    });
  } catch (error) {
    console.error("Failed to inject script:", error);
  }
});

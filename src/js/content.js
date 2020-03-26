let highlighter;

function sendResultsInfo() {
  chrome.runtime.sendMessage({
    id: 'RESULTS_INFO',
    data: {
      'selectedIndex': highlighter.selectedIndex,
      'nResults': highlighter.nResults
    }
  });
}

function search(options) {
  highlighter.remove();

  if (options.regex.length === 0) {
    return;
  }

  try {
    let regex = new RegExp(options.regex, options.flags);
    highlighter.apply(regex);
    highlighter.selectIndex(0);
    sendResultsInfo();
  } catch (error) {
    console.error(error);
  }
}

function onMessage(message) {
  switch (message.id) {
    case 'SEARCH':
      search(message.options);
      break;
    case 'SELECT_NEXT':
      highlighter.selectNext();
      sendResultsInfo();
      break;
    case 'SELECT_PREVIOUS':
      highlighter.selectPrevious();
      sendResultsInfo();
      break;
    case 'RESET':
      highlighter.remove();
      break;
    default:
      console.error(`Message ${message} no implemented.`);
      break;
  }
}

function init() {
  chrome.runtime.onMessage.addListener(onMessage);
  highlighter = new Highlighter();

  let startNode = document.getElementsByTagName('body');
  highlighter.setStartNode(startNode[0]);
}

init();
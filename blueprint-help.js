// THIS IS JUST A HELPER FUNCTION TO SHOW ALL AVAILABLE BLUEPRINTS FOR A `/blueprint-demo` COMMAND WITHOUT PARAMETERS

const dir = './'
const fs = require('fs')

const getBlueprints = () => {
  let blueprints = []
  fs.readdirSync(dir).forEach(file => {
    if(file.indexOf('blueprint-') >= 0) {
      let bp = file.replace('blueprint-', '').replace('.js', '')
      if(bp !== 'help') blueprints.push(bp)
    }
  })
  
  let text = 'Here\'s a list of available blueprints:\n\n'
  blueprints.forEach(bp => {
    text += '`'+bp+'`\n'
  })
  
  return text
}

module.exports = {
  ephemeral: {
    help: {
      blocks: [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": getBlueprints()
          }
        }
      ]
    },
    usage: {
      blocks: [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "`/blueprint-settings set_name App name`"
          }
        },
          {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "`/blueprint-settings set_icon https://path.to/icon.jpg`"
          }
        }
      ]
    }
  }
}
  
const axios = require('axios');

const getInsights = async (req, res, next) => {
    // console.log(process.env.AUTH_TOKEN);
    try {
        const topicRes = await axios.get(
            `https://api.symbl.ai/v1/conversations/${req.body.conversationId}/topics`,{
                headers: {
                    'Authorization': `Bearer ${process.env.AUTH_TOKEN}`
                  },
                json: true
        });
        let topic = "";
        // console.log(topicRes.data);
        topicRes.data.topics.forEach(function (arrayItem) {
            topic += (arrayItem.text + ", ");
            // topic = topic.concat(arrayItem.topics.text, ", ");
        });
        console.log(topic)
        req.insight = {};
        req.insight.topic = topic        
    } catch (error) {
        console.log(error);
    }


    try {
        const actionItemsRes = await axios.get(
            `https://api.symbl.ai/v1/conversations/${req.body.conversationId}/action-items`,
            {
                headers: {
                    'Authorization': `Bearer ${process.env.AUTH_TOKEN}`
                  },
                json: true
            }
        );
        let actionItems = "";
        actionItemsRes.data.actionItems.forEach(function (arrayItem) {
            actionItems += (arrayItem.text + ", ");
            // actionItems = actionItems.concat(arrayItem.actionItems.text, ", ");
        });
        // console.log(actionItems)
        req.insight.actionItems = actionItems            
    } catch (error) {
        console.log(error);
        
    }


    try {
        const followUpsRes = await axios.get(
            `https://api.symbl.ai/v1/conversations/${req.body.conversationId}/follow-ups`,
            {
                headers: {
                    'Authorization': `Bearer ${process.env.AUTH_TOKEN}`
                  },
                json: true
            }
        );
        let followUps = "";
        followUpsRes.data.followUps.forEach(function (arrayItem) {
            followUps += (arrayItem.text + ", ");
            // followUps = followUps.concat(arrayItem.followUps.text, ", ");
        });
        console.log(followUps)
        req.insight.followUps = followUps        
    } catch (error) {
        console.log(error);
    }
    console.log(req.insight);
    next();
};

module.exports = {
    getInsights: getInsights
};
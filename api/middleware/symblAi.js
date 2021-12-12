  
const axios = require('axios');

const getInsights = async (req, res, next) => {
    try {
        const topicRes = await axios.get(
            `https://api.symbl.ai/v1/conversations/${req.body.conversationId}/topics`,{
                headers: {
                    'Authorization': `Bearer ${process.env.AUTH_TOKEN}`
                  },
                json: true
        });
        req.insight = {};
        req.insight.topic = topicRes.data.topics;        
    } catch (error) {
        console.log(error);
    }

    try {
        const messagesRes = await axios.get(
            `https://api.symbl.ai/v1/conversations/${req.body.conversationId}/messages`,{
                headers: {
                    'Authorization': `Bearer ${process.env.AUTH_TOKEN}`
                  },
                json: true
        });
        let messages = "";
        messagesRes.data.messages.forEach(function (arrayItem) {
            messages += (arrayItem.text + " ");
        });
        console.log("messages =>", messages)
        req.insight.messages = messages        
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
        req.insight.actionItems = actionItemsRes.data.actionItems;          
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
    
    console.log("req.insight => " + req.insight);
    console.log("req.insight.topic => " + req.insight.topic);
    console.log("req.insight.messages => " + req.insight.messages);
    console.log("req.insight.actionItems => " + req.insight.actionItems);
    console.log("req.insight.followUps => " + req.insight.followUps);
    next();
};

module.exports = {
    getInsights: getInsights
};
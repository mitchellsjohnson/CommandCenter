function addUrl(){
            
    window.location.href = '/urls/addform';
}
function cancelURLAdd(){
    
    window.location.href = '/urls';
}
function cancelURLEdit(){
    
    window.location.href = '/urls';
}
function addChannel(){
            
    window.location.href = '/channels/addform';
}
function cancelChannelAdd(){
    
    window.location.href = '/channels';
}
function cancelChannelEdit(){
    
    window.location.href = '/channels';
}
function addUrlToChannel(channelId){
            
    window.location.href = '/channels_urls/' + channelId + '/addform';
}

function cancelChannelUrlAdd(channelId){
    
    window.location.href = '/channels_urls/' + channelId;
}

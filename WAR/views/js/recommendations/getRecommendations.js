var mapRecommendationToObj = new Map();

var mapIdToCarrySprirtes = new Map();

var xmlhttp = new XMLHttpRequest();

/**
 * Function responsible for perform the GET response
 */
xmlhttp.onreadystatechange = function() {

    if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        if(this.responseText.length > 1) {
            var recommendationList = JSON.parse(this.responseText);
            createReccomendationList(recommendationList);
        }
        else
        {
            alert("nothing to recommend, sorry");
        }
    }
};
/**
 * Prepare and send the GET request to the server
 */
function askForRecommendations(sendSet) {
    if(sendSet != "") {
        xmlhttp.open("GET", "http://localhost:9001/recc" + "?askForRecommendations=" + sendSet, true);
        xmlhttp.send();
    }
}

var types = [];
function sendSpriteTypesToTheServe(spriteSet)
{

    types = typeSetCollection;
    removeItemFrom(typeSetCollection, "Immovable");
    var send = "";
    for(var i = 0; i < types.length; i++)
    {
        send = types[i] + " " + send;
    }
    types = [];
    askForRecommendations(send);
}

function sendSpriteTypesToTheServeWithoutConstraint(spriteSet)
{

    types = typeSetCollection;
    removeItemFrom(typeSetCollection, "Immovable");
    var send = "";
    for(var i = 0; i < types.length; i++)
    {
        send = types[i] + " " + send;
    }
    types = [];
    askForRecommendations(send);
}

function createReccomendationList(recommendationList)
{
    resetRecommendations();
    var ul = document.getElementById("recommenderUl");
    for(var i = 0; i < recommendationList.length; i++)
    {
        var r = recommendationList[i];
        var confidence = r['confidence'];
        var type = r['type'];
        //var specObj = r['specialized'];
        var commObj = r['common'];
        var stypes = r['stypes'];

        var containerDiv = document.createElement('div');
        containerDiv.id = "containerDiv";

        var gameNameDiv = document.createElement('div');
        gameNameDiv.id = "gameNameDiv";

        var gameNameSpan = document.createElement('span');
        gameNameSpan.id = 'gameNameSpan';
        gameNameSpan.classList.add('descriptionSpan');
        gameNameSpan.innerHTML = "From: ";

        var gameNameValueSpan = document.createElement('span');
        gameNameValueSpan.id = 'gameNameValueSpan';
        gameNameValueSpan.classList.add('spanValue');
        gameNameValueSpan.innerHTML = r['game'];

        var groupSpanDiv = document.createElement('div');
        groupSpanDiv.id = "groupSpanDiv";

        var confDiv = document.createElement('div');
        confDiv.id = "confDiv";

        var confSpan = document.createElement('span');
        confSpan.id = "confSpan";
        confSpan.innerHTML = "Confidence";
        confSpan.classList.add('descriptionSpan');

        var confSpanValue = document.createElement('span');
        confSpanValue.innerHTML = confidence;
        confSpanValue.classList.add('spanValue');

        var typeDiv = document.createElement('div');
        typeDiv.id = "typeDiv";

        var typeSpan = document.createElement('span');
        typeSpan.id = 'typeSpan';
        typeSpan.classList.add('descriptionSpan');
        typeSpan.innerHTML = "Type";

        var typeSpanValue = document.createElement('span');
        typeSpanValue.innerHTML = type;
        typeSpanValue.classList.add('spanValue');

        var spriteContainerDiv = document.createElement('div');
        spriteContainerDiv.id = 'spriteContainerDiv';
        //var spanSpecialized = document.createElement('div');
        //spanSpecialized.innerHTML = "Specialized";

        var specializedDiv = document.createElement('div');
        specializedDiv.id = "specializedDiv" + i;
        specializedDiv.classList.add('specializedDiv');
        //mapRecommendationToObj.set(specializedDiv.id, specObj);
        //mapIdToCarrySprirtes.set(specializedDiv.id, stypes);
        var specializedSpan = document.createElement('span');
        specializedSpan.id = 'specializedSpan';
        specializedSpan.innerHTML = 'Specialized';

        var commonSpan = document.createElement('span');
        commonSpan.id = 'commonSpan';
        commonSpan.innerHTML = 'Common';

        var specializedSpriteImg = document.createElement('img');
        //specializedSpriteImg.src = specObj.parameters['img'] + ".png";

        var commonDiv = document.createElement('div');
        commonDiv.id = "commonDiv" + i;
        commonDiv.classList.add("commonDiv");
        mapIdToCarrySprirtes.set(commonDiv.id, stypes);
        mapRecommendationToObj.set(commonDiv.id, commObj);

        var commonSpriteImg = document.createElement('img');
        commonSpriteImg.src = commObj.parameters['img'] + ".png";

        confDiv.appendChild(confSpan);
        confDiv.appendChild(confSpanValue);

        typeDiv.appendChild(typeSpan);
        typeDiv.appendChild(typeSpanValue);

        groupSpanDiv.appendChild(confDiv);
        groupSpanDiv.appendChild(typeDiv);

        //specializedDiv.appendChild(specializedSpriteImg);
        var specObj = retrieveRecommendationObj(specializedDiv.id);
        //var specInfoDiv = divObj(specObj);
        //specializedDiv.appendChild(specInfoDiv);
        //specializedDiv.setAttribute("onclick", "getRecObj(this.id)");

        commonDiv.appendChild(commonSpriteImg);
        var obj = retrieveRecommendationObj(commonDiv.id);
        var commonInfoDiv = divObj(obj);
        commonDiv.appendChild(commonInfoDiv);
        commonDiv.setAttribute("onclick", "getRecObj(this.id)");

        //spriteContainerDiv.appendChild(specializedSpan);
        //spriteContainerDiv.appendChild(specializedDiv);
        //spriteContainerDiv.appendChild(commonSpan);
        spriteContainerDiv.appendChild(commonDiv);

        gameNameDiv.appendChild(gameNameSpan);
        gameNameDiv.appendChild(gameNameValueSpan);

        containerDiv.appendChild(gameNameDiv);
        containerDiv.appendChild(groupSpanDiv);
        containerDiv.appendChild(spriteContainerDiv);

        ul.appendChild(containerDiv);
    }
}

function show()
{
    alert('Show!');
}

function divObj(obj)
{
    var parContainerDiv = document.createElement('div');
    parContainerDiv.id = 'parContainerDiv';

    var nameDiv = document.createElement('div');
    nameDiv.id = 'nameDiv';

    var typeDiv = document.createElement('div');
    typeDiv.id = 'typeDiv';

    var nameSpan = document.createElement('span');
    nameSpan.id = 'nameSpan';
    nameSpan.innerHTML = 'id: ' + obj.identifier;

    var typeClass = document.createElement('span');
    typeClass.id = 'typeClassId';
    typeClass.innerHTML = 'type:';
    typeClass.classList.add('parKeySpan');

    var typeSpan = document.createElement('span');
    typeSpan.id = 'typeSpan';
    typeSpan.innerHTML = 'type:   ' + obj.referenceClass;

    nameDiv.appendChild(nameSpan);
    typeDiv.appendChild(typeSpan);

    parContainerDiv.appendChild(nameDiv);
    parContainerDiv.appendChild(typeDiv);


    for(var par in obj.parameters)
    {
        if(par != "img") {
            var div = document.createElement('div');
            div.classList.add('parDiv');

            var keySpan = document.createElement('span');
            keySpan.classList.add('parKeySpan');
            keySpan.innerHTML = par;

            var valSpan = document.createElement('span');
            valSpan.classList.add('parKeyValue');
            valSpan.innerHTML = obj.parameters[par];

            div.appendChild(keySpan);
            div.appendChild(valSpan);
            parContainerDiv.appendChild(div);
        }
    }

    return parContainerDiv;
}

function retrieveRecommendationObj(id)
{
    return mapRecommendationToObj.get(id);
}


function getRecObj(id)
{
    var recObj = retrieveRecommendationObj(id);
    if(!spriteNameCollection.includes(recObj.identifier))
    {
        addToSpriteSet(recObj, id);
        askForPositions(recObj['gameItBelongsTo'], recObj['referenceClass']);
    }
    else
    {
        alert("Sprite already presented in the sprite set");
    }
    //retrieve suggested position for this sprite type - if any
    //associate them in the map like (recObj.referenceClass) -> (0,1), (11,10)
}

function addToSpriteSet(obj, id)
{
    if (confirm("Add to sprite set?")) {
        gameObj["SpriteSet"].push(obj);
        createLevelMappingForThisImage(obj.identifier);
        var sprites = mapIdToCarrySprirtes.get(id);
        for(var i = 0; i < sprites.length; i++)
        {
            var extra = sprites[i];
            gameObj["SpriteSet"].push(extra);
            createLevelMappingForThisImage(extra.identifier);
        }
        refreshGame(gameObj);
        sendSpriteTypesToTheServe(gameObj["SpriteSet"]);
    }
}

function resetRecommendations()
{
    var ul = document.getElementById("recommenderUl");
    while (ul.childNodes.length > 0)
    {
        ul.removeChild(ul.lastChild);
    }

    mapRecommendationToObj = new Map();
}

function callRecommendationsIfSpriteObjectListIncreases()
{
    var listElements = document.getElementById('spriteList');
    if(listCurrentLength < listElements.childNodes.length)
    {
        listCurrentLength = listElements;
        sendSpriteTypesToTheServe(gameObj["SpriteSet"]);
    }
}
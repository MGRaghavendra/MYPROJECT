function GUID():string{
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    var box_ID = s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    return box_ID;
}

export function getBoxId():string{
    let boxId = localStorage.getItem('box-id')
    if(boxId !== null){
        return boxId
    }
    else{
        boxId = GUID();
        localStorage.setItem('box-id',boxId)
        return boxId
    }
}

export function getsessionToken():string | null{
    return localStorage.getItem('session-id')
}

export function getFromlocalStorage(key:string):string | null{
    return localStorage.getItem(key)
}
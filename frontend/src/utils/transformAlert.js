export default function transformAlert(alert){
    alert = alert.split('');
    let tag = alert.shift();
    alert = alert.join('');
    if(tag === 'e'){
        tag = 'danger';
    }else{
        tag = 'success';
    }

    return [
        alert,
        tag
    ];
}
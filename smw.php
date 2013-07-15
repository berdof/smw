<?php
header('Content-Type: application/javascript; charset=UTF-8');

$scriptList = array(
    'js/libs/jquery-1.7.1.min.js',
    '$smwJq = jQuery.noConflict();',
    'js/libs/jquery.jscrollpane.min.js',
    'js/libs/typeaheadSmwMod.jquery.js',
    'js/libs/jquery.mousewheel.js',
    'js/libs/handlebars.js',
    'js/smwVievs.js',
    'js/smw.js'
);

if(file_exists('readyscript/smw.js')) {
    echo file_get_contents('readyscript/smw.js');
    exit;
}
else {
    ob_start();
    foreach($scriptList as $script) {
        if(file_exists($script)) {
            echo file_get_contents($script);
        }
        else {
            echo $script;
        }
    }
    $scriptContent = ob_get_contents();
    $scriptContent = str_replace("'css/style.css?v='+Math.round(+new Date()/1000)","'css/style.css?v=".filemtime(__DIR__.'/css/style.css')."'",$scriptContent);
    file_put_contents('readyscript/smw.js',$scriptContent);
    ob_end_flush();
    exit;
}
?>
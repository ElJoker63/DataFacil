<?php

include 'parser/examples/autoload.php';
$apk = new \ApkParser\Parser('1.apk');

$manifest = $apk->getManifest();
echo "Version: " . $manifest->getVersionName();

?>
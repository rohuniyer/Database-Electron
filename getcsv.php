<?php



$row = 1;

if (($file = fopen("24443.csv", "r")) !== FALSE) { //Put in your own spreadsheet here
  while (($data = fgetcsv($file)) !== FALSE) {
    $num = count($data); //Counting number of columns in current row (should be 3)
    //echo "line $row: \xA"; //This is only to make sure it is reading all the lines
    $row++;
    //Assuming there are only 2 columns per row...
    $filename = $data[0] . ".fap"; //create the filename 
    $myfile = fopen($filename, "w"); //create file
    fwrite($myfile, $data[1]); //write sequence to file
    fclose($filename);
    $filename2 = $data[0] . ".sap";
    $myfile2 = fopen($filename2, "w");
    fwrite($myfile2, $data[2]);
    fclose($filename)2;
    /*for ($c=0; $c < $num; $c++) {  This is a for loop to use if there are more than 2 columns per row.
        echo $data[$c] . "   " ; 
    }*/
    echo "\xA";
  }
  fclose($file);
}


//If there is a first row with column titles use this commented out code.
/*$handle = fopen("24443.csv", "r");
$data = fgetcsv($handle); //This line should get that first line of the file out of the way

while($data !== FALSE) {
  $num = count($data); //Counting number of columns in current row
    echo "line $row: \xA";
    $row++;
    //Assuming there are only 2 columns per row...
    $filename = $data[0] . ".sap";
    $myfile = fopen($filename, "w");
    fwrite($myfile, $data[1]);
    /*for ($c=0; $c < $num; $c++) {  This is a for loop to use if there are more than 2 columns per row.
        echo $data[$c] . "   " ; 
    }
    echo "\xA";
}

fclose($handle);*/

?>


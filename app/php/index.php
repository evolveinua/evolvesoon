<?
// Обработка формы контактов 

// ----------------------------конфигурация-------------------------- // 
 
$adminemail="info@evolve.in.ua";  // e-mail админа 
 
 
$date=date("d.m.y"); // число.месяц.год 
 
$time=date("H:i"); // часы:минуты:секунды 
 
//---------------------------------------------------------------------- // 
 
  
 
// Принимаем данные с формы 
 
$name=$_POST['username']; 
 
$email=$_POST['email']; 
 
$msg=$_POST['message']; 
 
  
 
// Cобираем сообщение в файл
 
 
$msg=" 
 
 
<p>Имя: $name</p> 
 
 
<p>E-mail: $email</p> 
 
 
<p>Сообщение: $msg</p> 
 
 
"; 
 
  
 
 // Отправляем письмо админу  
 
mail("$adminemail", "$date $time Сообщение 
от $name", "$msg"); 
 
  
 
// Сохраняем в файл
 
$f = fopen("message.txt", "a+"); 
 
fwrite($f," \n $date $time Сообщение от $name"); 
 
fwrite($f,"\n $msg "); 
 
fwrite($f,"\n ---------------"); 
 
fclose($f); 

exit; 
 
 } 
 
?>

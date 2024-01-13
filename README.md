<h2>Log file management system - Bachelor thesis</h2>
<h4>In collaboration with University of Applied Sciences Ulm (Germany) and Software Group AD</h4>

<br/>
<br/>

<h2>Introduction</h2>
<p>
Being part of a development team in Software Group BG AD means that a fair percent of our time is spent trying to read through numerous generated log files. The problem that occurs is the shear mass of the files that need to be inspected. Hundreds of lines of code are saved in these files, which makes the processes of scouring the files slow and ineffective.
A log file management system is only one of the possible solutions to simplifying the process. It’s a client-server application which provides an intuitive, simple and easy to use user-interface (UI) that enables developers to properly read through the company’s log files. This thesis offers an insight into the problem and how the solution for it was developed.</p>

<h2>UI/UX</h2>
![image](https://github.com/TonislavTachev/SGDebug/assets/33254592/3e1963d3-dba3-4386-8467-15a0d5175db7)
![image](https://github.com/TonislavTachev/SGDebug/assets/33254592/8038b0d2-121f-4836-8dd7-7b6b21352e2c)

<br/>
<h2>Technologies used</h2>
<ul>
  <li>React</li>
  <li>NodeJs</li>
  <li>Express</li>
  <li>MongoDB</li>
</ul>
<br/>
<h2>Case study</h2>
<p>In order to help engineers to better understand the system and help them find the the bugs in the system there was a need for an application which would make these cumbursome tasks easier. This is why the application offers the implemented functionality of uploading, sifting, filtering, sorting and searching through these log files.</p>
<br/>
<p>The main problem was the fact that one singular logfile contained more than 20000 lines of generated log lines, which meant that a conventional upload and filtering of the file would be quite slow and unacceptable. This is why the uploading of the files was made in collabortion with NodeJS worker threads.
By utilizing worker threads, the log lines that were already parsed would be uploaded to the application and would be accessable to the user, while the lines that weren't processed would be later saved</p>
<br/>

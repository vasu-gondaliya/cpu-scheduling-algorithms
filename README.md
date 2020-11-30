# CPU Scheduling Algorithms

## Functionalities
- 9 Algorithms are implemented.
- Each process can have different number of CPU Burst Time and I/O Burst Time.
- Gantt Chart and Timeline Chart for the given Schedule.
- Context Switching Time.
- Animation of the Time Log.
- Comparison for Round Robin Algorithm for all time quantum.
- Comparison between all the algorithms wrt Average Completion Time, Turn Around Time, Waiting Time and Response Time.


### Different Criteria and Algorithms
- The first process arrived in the ready queue is processed first.
  - **First Come First Serve (FCFS)**
    >Non-Preemptive
- The shortest job in the ready queue is processed first.
  - **Shortest Job First (SJF)**
    >Non-Preemptive
  - **Shortest Remaining Job First (SRJF)**
    >Preemptive
- The longest job in the ready queue is processed first.
  - **Longest Job First (LJF)**
    >Non-Preemptive
  - **Longest Remaining Job First (LRJF)**
    >Preemptive
- The highest priority job in the ready queue is processed first.
  - **Priority Non-Preemptive (PNP)**
    >Non-Preemptive
  - **Priority Preemptive(PP)**
    >Preemptive
- The jobs in the ready queue are given a fixed time quantum.
  - **Round Robin (RR)**
    >Preemptive
- The job with the highest response ratio in the ready queue is processed first.
  - **Highest Response Ratio Next (HRRN)**
    >Non-Preemptive
    
**Non-Preemptive:**
  Once a job enters the Running Queue, it will only leave when its required CPU Burst Time is completed or it requires an I/O Job.
  
**Preemptive:**
  A job in the Running Queue can be removed (preeempted) by other process of higher priority or with better criteria satisfaction or the given time quantum is completed.
  
#### Different States in CPU Scheduler
- Remain
  >The processes which are yet to arrive.
- Ready
  >The processes which are ready to be executed.
- Running
  >Current Process Running in the CPU.
- Block
  >The processes which are blocked for I/O Time.
- Terminate
  >The processes which have completed all the CPU and I/O.
  
### Technologies Used
- HTML
- CSS
- Vanilla JS
- Google Charts
- Chart.js

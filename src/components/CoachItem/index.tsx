import React,{ChangeEvent, useState} from 'react';

import api from '../../services/api';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

export interface Coach extends ClassSchedule {
  id: number;
  avatar: string;
  bio: string;
  cost: number;
  name: string;
  subject: string;
  whatsapp: string;
 classSchedule:ClassSchedule;
 time: string;

}
export interface ClassSchedule {
  id: number;
 weekday:string;
  from: string;
 to: string;
}

enum week{
  "Domingo"= 0,
  "Segunda-feira"= 1,
  "Terça-feira"= 2,
  "Quarta-feira"= 3,
  "Quinta-feira"= 4,
  "Sexta-feira"= 5,
  "Sábado"= 6
}

function RetornoWeekDay(weekday:string){
  try{

  if(weekday==="0")
  weekday ="Domingo";
  if(weekday==="1")
  weekday ="Segunda-feira";
  if(weekday==="2")
  weekday ="Terça-feira";
  if(weekday==="3")
  weekday ="Quarta-feira";
  if(weekday==="4")
  weekday ="Quinta-feira";
  if(weekday==="5")
  weekday ="Sexta-feira";
  if(weekday==="6")
  weekday ="Sábado";

return weekday;
  }
  catch(e : any){
console.log(e);
  }
}

function convertHourToMinutes(time: string) {
  const [hour, minutes] = time.split(':').map(Number);
  const timeInMinutes = (hour * 60) + minutes;

  return timeInMinutes;
}
interface CoachItemProps {
  coach: Coach;
  //classSchedule: ClassSchedule;
}

const CoachItem: React.FC<CoachItemProps> = ({ coach }) => {
  function createNewConnection() {
    api.post('connections', {
      coach_id: coach.id,
    });
  }
  const state = {
    persons: [coach.classSchedule]
  }
    //const [state, setState] = useState([coach.classSchedule]);

    // const [subject, setSubject] = useState('');
    // const [week_day, setWeekDay] = useState('');
    // const [time, setTime] = useState('');
     const week_day = coach.classSchedule?.weekday;
     const time = coach?.time;
     const subject = coach?.subject;
   function  getNewComponent() {

    api.get('classes',{
    params:{
      subject,
      week_day,
      time,
    }
  }
  
      )
        .then(res => {
          const persons = res.data;

       // eslint-disable-next-line react-hooks/rules-of-hooks
       useState({ persons});
      // persons.ToList();
      //  return persons;
        });
}




  return (
    <article className="coach-item">
      <header>
        <img src={coach.avatar} alt={coach.name} />
        <div>
          <strong>{coach.name}</strong>
          <span>{coach.subject}</span>
        </div>
      </header>

      <p>{coach.bio}</p>

      <footer>
        <p>Preço/Hora
          <strong>R$ {coach.cost}</strong>
        </p>
        <p></p>


        <p>Horario:
        {/* <strong>{coach.classSchedule.weekday} </strong>
          <strong>De {coach.classSchedule.from}</strong>
          <strong>até {coach.classSchedule.to}</strong> */}
          <ul>
        { state.persons.map(person => <li>Dia{RetornoWeekDay(person?.weekday.toString())}</li>)}
        { state.persons.map(person => <li>De{person?.from.toString()}</li>)}
        { state.persons.map(person => <li> até{person?.to.toString()}</li>)}
      </ul>

        </p>
        <a
          target="_blank"
          rel="noreferrer"
          onClick={createNewConnection}
          href={`https://wa.me/${coach.whatsapp}`}
        >
          <img src={whatsappIcon} alt="Whatsapp"/>
          Entrar em contato
        </a>
      </footer>
    </article>
  );
}

export default CoachItem;


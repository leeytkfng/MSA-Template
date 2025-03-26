import {useState} from "react";


const test1 = () =>{
    const [messages,setMessages] = useState('');


    const moveToRegister = () =>{
        window.location.href = "http://localhost:8081/register-form";
    };


    const handleClick = async () => {
        try {
            const res = await fetch('/api/users');
            const text = await res.text();
            setMessages(text); //user-test 출력
        } catch (err: any) {
            console.error('API 호출 실패' ,err);
        }
    };

    return (
        <div>
            <button onClick={handleClick} >유저 테스트</button>
            <p>{messages}</p>
            <button onClick={moveToRegister}>테스트용</button>
        </div>
    );
};

export default test1;
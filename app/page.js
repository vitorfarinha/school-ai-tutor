"use client";
import { useState, useRef, useEffect } from 'react';

export default function Page(){
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Olá! Sou o teu tutor. Envia uma pergunta e guiarei o teu raciocínio.'}
  ]);
  const [text, setText] = useState('');
  const [fileIds, setFileIds] = useState([]);
  const fileRef = useRef();
  const chatRef = useRef();

  useEffect(()=>{
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  }, [messages]);

  async function handleUpload(e){
    const file = e.target.files[0];
    if(!file) return;
    const form = new FormData();
    form.append('file', file);
    try{
      const res = await fetch('/api/upload', { method:'POST', body: form });
      const json = await res.json();
      if(json.fileId){
        setFileIds(prev=>[...prev, json.fileId]);
      } else {
        alert('Upload falhou');
      }
    } catch(err){
      console.error(err);
      alert('Erro no upload');
    }
  }

  async function send(){
    if(!text.trim()) return;
    const userMsg = { role:'user', content:text };
    const newMsgs = [...messages, userMsg];
    setMessages(newMsgs);
    setText('');
    try{
      const res = await fetch('/api/chat', {
        method:'POST',
        headers:{ 'Content-Type':'application/json' },
        body: JSON.stringify({ messages: newMsgs, fileIds })
      });
      const data = await res.json();
      const bot = { role:'assistant', content: data.reply?.content || data.reply || 'Sem resposta' };
      setMessages(m=>[...m, bot]);
    } catch(err){
      console.error(err);
      setMessages(m=>[...m, { role:'assistant', content:'Ocorreu um erro. Tenta novamente.' }]);
    }
  }

  return (
    <div className="container">
      <div className="header">
        <div className="brand">SAIS AI Tutor</div>
        <div style={{flex:1}} />
        <div className="small"></div>
      </div>

      <div className="chat" ref={chatRef}>
        <div className="upload-area" onClick={()=>fileRef.current.click()}>
          📎 Clique para carregar documento (PDF / imagem / DOCX)
        </div>
        <input type="file" ref={fileRef} style={{display:'none'}} onChange={handleUpload} />

        {messages.map((m, i)=>(
          <div key={i} className={'bubble ' + (m.role==='user' ? 'user' : 'bot')}>
            {m.content}
          </div>
        ))}

      </div>

      <div className="composer">
        <textarea
  value={input}
  onChange={(e) => setInput(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }}
  placeholder="Type your message..."
  className="w-full p-3 border rounded-lg resize-none"
  rows={2}
/>
        <button className="btn" onClick={send}>Enviar</button>
      </div>
    </div>
)
}

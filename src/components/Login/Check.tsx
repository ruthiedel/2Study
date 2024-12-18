import React, { useState } from 'react';
import { registerUser, logInUser } from '../../services/userService';
import { UserWithPassword, LoginCredentials } from '../../types';

const AuthForm: React.FC = () => {
  const [isRegister, setIsRegister] = useState<boolean>(true); // מצב אם אנחנו בהרשמה או בהתחברות
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [fullName, setFullName] = useState<string>(''); // רק בהרשמה
  const [message, setMessage] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (isRegister) {
      // הרשמה
      const user: UserWithPassword = { 
            name: fullName,
            email: email,
            books: [],
            userImagePath: '',
            password: password
       };
      try {
        const response = await registerUser(user);
        setMessage(response.message); // הצגת הודעה מהשרת
      } catch (error) {
        setMessage('שגיאה בהרשמה');
      }
    } else {
      // התחברות
      const credentials: LoginCredentials = { email, password };
      try {
        const response = await logInUser(credentials);
        setMessage(response.message); // הצגת הודעה מהשרת
      } catch (error) {
        setMessage('שגיאה בהתחברות');
      }
    }
  };

  return (
    <div>
      <h2>{isRegister ? 'הרשמה' : 'התחברות'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        {isRegister && (
          <div>
            <label>Full Name:</label>
            <input 
              type="text" 
              value={fullName} 
              onChange={(e) => setFullName(e.target.value)} 
              required 
            />
          </div>
        )}
        <button type="submit">{isRegister ? 'הרשם' : 'התחבר'}</button>
      </form>

      <p>{message}</p>

      <button onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? 'כבר יש לך חשבון? התחבר' : 'אין לך חשבון? הירשם'}
      </button>
    </div>
  );
};

export default AuthForm;

import styled from 'styled-components';
import { FaTrashAlt, FaSearch, FaArrowRight, FaMicrophone } from 'react-icons/fa';
import AllChat from './AllGroupes';

const ChatContainer = styled.div`
  flex: 2;
  padding: 10px;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  margin-top: 10px;
`;

const ChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eaeaea;
  padding-bottom: 10px;
`;

const MessageContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-top: 20px;
`;

const MessageInputContainer = styled.div`
  display: flex;
  background-color: #DBDCFF;
  padding: 10px;
  border-radius: 20px;
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
`;
const MessageInput = styled.div`
  display: flex;
  justify-content:center;
  align-items: center;
  padding: 10px;
  border-radius: 20px;
  gap: 10px;
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #E0E4EB;
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  &:hover {
    background-color: #d1d4da;
  }
`;
const IconButton2 = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #E0E4EB;
  padding: 5px;
  border-left: 1px solid black;
  cursor: pointer;
  &:hover {
    background-color: #d1d4da;
  }
`;

const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 16px;
  color: black;
`;

const GroupesWithChat = styled.div`
  flex: 2;
  background-color: #fff;
  padding: 20px;
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  border-radius: 30px;
  gap: 40px;
`;

const Chat = () => {
  return (
    <GroupesWithChat>
      <AllChat />
      <ChatContainer>
        <ChatHeader>
        <h2 className=" font-roboto font-bold text-[30px] text-[#132C33]">
          NAME OF THE GROUP
        </h2>
          <div>Icons for Call & Video</div>
        </ChatHeader>
        <MessageContainer></MessageContainer>
        <MessageInput>
          <IconButton>
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M8.06 2.1875C6.9375 2.1875 6 2.1875 5.2575 2.2875C4.4725 2.3925 3.76375 2.625 3.195 3.19375C2.625 3.76375 2.3925 4.4725 2.2875 5.25625C2.1875 6 2.1875 6.9375 2.1875 8.06V8.19C2.1875 9.3125 2.1875 10.25 2.2875 10.9925C2.3925 11.7775 2.625 12.4862 3.19375 13.055C3.76375 13.625 4.4725 13.8575 5.25625 13.9625C6 14.0625 6.9375 14.0625 8.06 14.0625H8.19C9.3125 14.0625 10.25 14.0625 10.9925 13.9625C11.7775 13.8575 12.4862 13.625 13.055 13.055C13.625 12.4862 13.8575 11.7775 13.9625 10.9925C14.0625 10.25 14.0625 9.3125 14.0625 8.19V8.06C14.0625 6.9375 14.0625 6 13.9625 5.2575C13.8575 4.4725 13.625 3.76375 13.055 3.195C12.4862 2.625 11.7775 2.3925 10.9925 2.2875C10.25 2.1875 9.3125 2.1875 8.19 2.1875H8.06ZM4.52 4.52C4.6825 4.3575 4.93 4.22375 5.5075 4.145C6.11 4.065 6.92 4.0625 8.125 4.0625C9.33 4.0625 10.14 4.065 10.7438 4.14625C11.32 4.22375 11.5675 4.3575 11.73 4.52125C11.8925 4.685 12.0262 4.93 12.105 5.50625C12.185 6.11 12.1875 6.92 12.1875 8.125C12.1875 9.33 12.185 10.14 12.1037 10.7438C12.0262 11.32 11.8925 11.5675 11.7288 11.73C11.565 11.8925 11.32 12.0262 10.7438 12.105C10.14 12.185 9.33 12.1875 8.125 12.1875C6.92 12.1875 6.11 12.185 5.50625 12.1037C4.93 12.0262 4.6825 11.8925 4.52 11.7288C4.3575 11.565 4.22375 11.32 4.145 10.7438C4.06625 10.14 4.0625 9.33 4.0625 8.125C4.0625 6.92 4.065 6.11 4.14625 5.50625C4.22375 4.93 4.3575 4.6825 4.52125 4.52" fill="#1E1E1E"/>
          <path d="M22.8125 4.375C22.8125 4.12636 22.7137 3.8879 22.5379 3.71209C22.3621 3.53627 22.1236 3.4375 21.875 3.4375C21.6264 3.4375 21.3879 3.53627 21.2121 3.71209C21.0363 3.8879 20.9375 4.12636 20.9375 4.375V7.1875H18.125C17.8764 7.1875 17.6379 7.28627 17.4621 7.46209C17.2863 7.6379 17.1875 7.87636 17.1875 8.125C17.1875 8.37364 17.2863 8.6121 17.4621 8.78791C17.6379 8.96373 17.8764 9.0625 18.125 9.0625H20.9375V11.875C20.9375 12.1236 21.0363 12.3621 21.2121 12.5379C21.3879 12.7137 21.6264 12.8125 21.875 12.8125C22.1236 12.8125 22.3621 12.7137 22.5379 12.5379C22.7137 12.3621 22.8125 12.1236 22.8125 11.875V9.0625H25.625C25.8736 9.0625 26.1121 8.96373 26.2879 8.78791C26.4637 8.6121 26.5625 8.37364 26.5625 8.125C26.5625 7.87636 26.4637 7.6379 26.2879 7.46209C26.1121 7.28627 25.8736 7.1875 25.625 7.1875H22.8125V4.375Z" fill="#1E1E1E"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M21.81 15.9375H21.94C23.0637 15.9375 24 15.9375 24.7425 16.0375C25.5275 16.1425 26.2362 16.375 26.805 16.945C27.375 17.5137 27.6075 18.2225 27.7125 19.0075C27.8125 19.75 27.8125 20.6862 27.8125 21.81V21.94C27.8125 23.0638 27.8125 24 27.7125 24.7425C27.6075 25.5275 27.375 26.2362 26.805 26.805C26.2362 27.375 25.5275 27.6075 24.7425 27.7125C24 27.8125 23.0637 27.8125 21.94 27.8125H21.81C20.6875 27.8125 19.75 27.8125 19.0075 27.7125C18.2225 27.6075 17.5138 27.375 16.945 26.805C16.375 26.2362 16.1425 25.5275 16.0375 24.7425C15.9375 24 15.9375 23.0638 15.9375 21.94V21.81C15.9375 20.6862 15.9375 19.75 16.0375 19.0075C16.1425 18.2225 16.375 17.5137 16.945 16.945C17.5138 16.375 18.2225 16.1425 19.0075 16.0375C19.75 15.9375 20.6863 15.9375 21.81 15.9375ZM19.2563 17.895C18.68 17.9737 18.4325 18.1075 18.27 18.27C18.1075 18.4325 17.9738 18.68 17.895 19.2575C17.815 19.86 17.8125 20.67 17.8125 21.875C17.8125 23.08 17.815 23.89 17.895 24.4937C17.9738 25.07 18.1075 25.3175 18.27 25.48C18.4325 25.6425 18.68 25.7762 19.2575 25.855C19.86 25.935 20.67 25.9375 21.875 25.9375C23.08 25.9375 23.89 25.935 24.4937 25.8538C25.07 25.7763 25.3175 25.6425 25.48 25.4787C25.6425 25.315 25.7763 25.07 25.855 24.4937C25.935 23.89 25.9375 23.08 25.9375 21.875C25.9375 20.67 25.935 19.86 25.8538 19.2562C25.7763 18.68 25.6425 18.4325 25.4787 18.27C25.315 18.1075 25.07 17.9737 24.4937 17.895C23.89 17.815 23.08 17.8125 21.875 17.8125C20.67 17.8125 19.86 17.815 19.2563 17.895ZM8.06 15.9375C6.9375 15.9375 6 15.9375 5.2575 16.0375C4.4725 16.1425 3.76375 16.375 3.195 16.945C2.625 17.5137 2.3925 18.2225 2.2875 19.0075C2.1875 19.75 2.1875 20.6862 2.1875 21.81V21.94C2.1875 23.0638 2.1875 24 2.2875 24.7425C2.3925 25.5275 2.625 26.2362 3.19375 26.805C3.76375 27.375 4.4725 27.6075 5.25625 27.7125C6 27.8125 6.9375 27.8125 8.06 27.8125H8.19C9.3125 27.8125 10.25 27.8125 10.9925 27.7125C11.7775 27.6075 12.4862 27.375 13.055 26.805C13.625 26.2362 13.8575 25.5275 13.9625 24.7425C14.0625 24 14.0625 23.0638 14.0625 21.94V21.81C14.0625 20.6862 14.0625 19.75 13.9625 19.0075C13.8575 18.2225 13.625 17.5137 13.055 16.945C12.4862 16.375 11.7775 16.1425 10.9925 16.0375C10.25 15.9375 9.3125 15.9375 8.19 15.9375H8.06ZM4.52 18.27C4.6825 18.1075 4.93 17.9737 5.5075 17.895C6.11 17.815 6.92 17.8125 8.125 17.8125C9.33 17.8125 10.14 17.815 10.7438 17.895C11.32 17.9737 11.5675 18.1075 11.73 18.27C11.8925 18.4325 12.0262 18.68 12.105 19.2575C12.185 19.86 12.1875 20.67 12.1875 21.875C12.1875 23.08 12.185 23.89 12.1037 24.4937C12.0262 25.07 11.8925 25.3175 11.7288 25.48C11.565 25.6425 11.32 25.7762 10.7438 25.855C10.14 25.935 9.33 25.9375 8.125 25.9375C6.92 25.9375 6.11 25.935 5.50625 25.8538C4.93 25.7763 4.6825 25.6425 4.52 25.4787C4.3575 25.315 4.22375 25.07 4.145 24.4937C4.065 23.89 4.0625 23.08 4.0625 21.875C4.0625 20.67 4.065 19.86 4.14625 19.2562C4.22375 18.68 4.3575 18.4325 4.52125 18.27" fill="#1E1E1E"/>
          </svg>
          </IconButton>
          <MessageInputContainer>
          <Input placeholder="Add New message" />
          <IconButton2>
          <svg width="41" height="25" viewBox="0 0 41 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M27.8 16.3401C27.8 17.4451 26.457 18.3401 24.8 18.3401C23.143 18.3401 21.8 17.4451 21.8 16.3401C21.8 15.2351 23.143 14.3401 24.8 14.3401C26.457 14.3401 27.8 15.2351 27.8 16.3401Z" fill="#132C33"/>
          <path d="M14.313 10.2101C14.4069 10.0943 14.5255 10.001 14.6601 9.93701C14.7947 9.87299 14.9419 9.83988 15.091 9.84009H34.509C34.6581 9.83996 34.8052 9.87315 34.9398 9.93723C35.0744 10.0013 35.1929 10.0947 35.2868 10.2105C35.3806 10.3263 35.4474 10.4616 35.4822 10.6065C35.517 10.7514 35.519 10.9023 35.488 11.0481L33.149 22.0481C33.1014 22.2721 32.9782 22.4731 32.8002 22.6172C32.6222 22.7614 32.4001 22.8401 32.171 22.8401H17.43C17.2009 22.8401 16.9788 22.7614 16.8008 22.6172C16.6228 22.4731 16.4996 22.2721 16.452 22.0481L14.113 11.0481C14.0821 10.9024 14.0841 10.7517 14.1188 10.6069C14.1536 10.462 14.2203 10.3268 14.314 10.2111L14.313 10.2101ZM16.325 11.8401L18.238 20.8401H31.361L33.274 11.8401H16.325ZM16.8 2.84009C16.8 2.57487 16.9054 2.32052 17.0929 2.13298C17.2804 1.94544 17.5348 1.84009 17.8 1.84009H31.8C32.0652 1.84009 32.3196 1.94544 32.5071 2.13298C32.6946 2.32052 32.8 2.57487 32.8 2.84009V6.84009H30.8V3.84009H18.8V6.84009H16.8V2.84009Z" fill="#132C33"/>
          </svg>
          </IconButton2>
          </MessageInputContainer>
          
          <IconButton>
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" xlinkHref="http://www.w3.org/1999/xlink">
          <rect width="30" height="30" fill="url(#pattern0_19_766)"/>
          <defs>
          <pattern id="pattern0_19_766" patternContentUnits="objectBoundingBox" width="1" height="1">
          <use xlinkHref="#image0_19_766" transform="scale(0.0111111)"/>
          </pattern>
          <image id="image0_19_766" width="90" height="90" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAAD7ElEQVR4nO2dS0tVURTHf6ClUdSwzKDC+gI9RhVFWOEgskEFPaD3xEArTJs1yxyF4Nfo5aDQD1CEYdmkSTXpnY8adQVzxYFVxMXHLffZZ51z1w/+IJd7Ze8/m733WmftfcBxHMdxHMdxHMepmBpgO3AO6AXuAaPAa2ACmFJN6Gej+p1b+ptt+j+cWVgHdAADwHdAFqlvwAOgHWikylkGnAKGgJ8BzJ1L08AgcBKop4pYoSPtfYrmzqUvwA1gFQVmCdAJjGdgcLmSNlzVNhWKXcBLAwaX6xXQTAFI5sR+YMaAqXMpaVsfUEdO2QA8MWCkVKhnwCZyRnOgbZpEVrIt3EtOOAz8MGCa/KeSYOgYxrmY8p5YIinpwwWM0qrBQdYmSUCzj2KMZF4rGTBHUphG9mOEzTld+OQfFsimrE2u022RFFzDWe+z+w2YIJGUBDWZhdWWIz4JrKSvu2ObXAu8MNB5iayXsRNRnQY6LRnpcsx88piBDktGGlMPUqfLQGclYyW57NQfP30yEkh0AWtUXZEDpg9pPxY7ZcBkUWPLaYls9ok0jR4yYLLoKJ6NAxEzhw/TMrnRUNJozTztjGX2z7RKGToMGCyq7gXaGmsauZSG0QMGDBZVSc3M2uy7oU1OSqwmDRgsZTuPgwu0O+1pZDJ0+dl2A8aK0ZG9NaTR5w2YKkZH9pmQRvcaMFSMmn0zpNH3DZgpRs2+E9LovKRESxnM2SMhjX4bcNR1Ag1kS0iz34RsWKi06DXs0B2oT19DNmoqUKMasMPqgNOVOaPXYoe1Fo0eSzG9mRXXLU4dIRfDLgMj2+xi6Ns74mzvPGAhTsDiIThxQvBzgeYzKWBS6XRIoz1NypxGbwlptCf+iZP4R89WixGVDCT8gy+Ev2k3YLBUGPjEejjblobRSZDh5Qb8MXl6gbKHRTFoYDRL0Qto0KsYxGhdR0vkkrDjaRc5fjSyd+7WtGuD/h3T5Pcx7v6o5iJ0UV0hAss1NShVqrFYhehoIbZUqdqJfFjouYFOS9EPCyXs9ONv8egzMMokkm6TIXV6fFcKrqfAUjKmSQ+mS0E1CWzECHtyfuuMzBMY7cMYhwwlnSTQGZUjGOVCQa76mdaacNO05nwaKVm84me+q3++5XTh20POWA88NmCeVKhhC1f6LGaf3Wc8gpzRYCTzfXKocP2FAVPLlbRpBwWjVi8VsZBi/apZuKRNhWW5dvJdBgZ/1ou6V1JF1OtVDI9SDnSm9UHq8Wq7en42GvQA+119G8VizZ3Q/9WWZklA3qnRerazQI9WA43oq0DG/3o9yLh+NqLf6dFTrMlv/fUgjuM4juM4juM4VMgvsFJQNF1us8cAAAAASUVORK5CYII="/>
          </defs>
          </svg>
          </IconButton>
          <IconButton>
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" xlinkHref="http://www.w3.org/1999/xlink">
            <rect width="30" height="30" fill="url(#pattern0_19_764)"/>
            <defs>
            <pattern id="pattern0_19_764" patternContentUnits="objectBoundingBox" width="1" height="1">
            <use xlinkHref="#image0_19_764" transform="scale(0.0111111)"/>
            </pattern>
            <image id="image0_19_764" width="90" height="90" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEsklEQVR4nO2dy4sdRRSHvwjOjIgRwY0DYoyMiq9kEpIovhI1/hW6cCEuXAhCMhEXmoCQjGKMLmKiG10oSHzgg+ADRHElEnwlRgR3RjDJjBgFE50pOVCDl6Gruvpxu6r6ng8OXO7crj79m3NPn3r1BUVRFEVRFOV/7gVeAo4Df1r7ATgIbB34nFKTa4DPAVNinwFX1z3JqHMnMB8g8pLNAXfEdjrHSJ6vIPKg2FOxnc+JT2uIPJhGlAC2NhB5ye4OOdGo83ILQh+IfRE5cLwFoaX0U0o404LQ0oZSgmnJlBJU6I4wGtEqdK8wGtEqdK8wGtEqdK8wGtEqdK8wGtEqdK8wGtEqdK8wGtEqdK8wGtEqdK8wGtEqdK8wGtH1GAdmgRPW9gBjEYWu6k82zBaIsDui0FX9yYZfCy5M3osldFV/ssFUFGLYQvd2HYhRoVVooxHN0FPH93YPzCN9WeZrEksdDwNX0kNMYkL3FqNC91fonxhBTMdCvwpcxAhiOhJ6AdhewS8Z89gC7ALeBo7Z7XPngLP29VH7t53AZnvMSAv9L3BfoD/rbVn3e43zzNuNSOsYQaEXgPsD/BBxPmzpHiB2GFhLQpx1OHphS5uFHis5/wXAPhv1pmX7B9gLTJAAcw4nVzs+/2OFC309YKvzt0MQeLl9ncLW6KMO525tuKHzZ+Biz3k3Aac6EHnJTgIbici7DsdcFcI9gRcmFYNP5Db2K1a1MzHFfsLh1CeeY8qe0fFaSbroMpKLIjtKGrnL4ZDcJCcdx6z2lF9S567y3Pi6yMkhObvzG+T5wGmHQ097jrvZ8cwOqYFd7GsgjvzjtwGXWdvuqZhC7FkicMDhzB/2olxI5H687JjrPXVykxKu6J4x07D0W0PH3FRS+K8oOV6i+wXgFc9nmnZGitLYZMM2PyAC73scerRh2+sbCiLmokmbi8A0HXOD56stDj3YoO2DiQot9iIR2F0yZrEtII0sZ7zmAFFXQs/FWAk1ARwpcewjT9lXxJYWxBim0MY+Wq5zrgB+K3HsL1uqXR7Q3q4MhH6SSEwHPtdOcvoXwOPAJY623slA6LeIyDrHOjiXuernYxU7I21RpVMja0iisgr4MlBoV94OGdeoMsVVlZnA8Y/ojAFPBUSGjGMUERJRVW6uVQnp1PxNQlwLHLJlXpGzMmZShApdk+uA5woqk5UNUod8vYfFjlxSh4vz7AC+XMgbnqHR0JvhTMspZNK2mcXNsAq3ZVzevUlGPOB4f2cGQsssUzY8n3EX/HYy4ivPoNJ8wkKfzm173QJwaYbDpPvJDAM85OnOpyj0YgrLxsYHdrCGOi7ddReHE5zKeo8EmK3pvGvCc62dEK0rykzNzojLxJcbSYATQ8h5exsIM9ipqdIZMTWWUmQh9DnPrwiFzOB0Yd94BsE6Z0+DC5H1fC6m7NhCLJFljOYqEmLciv1LzQuSxZAuNkZc5LiBEWNDwNxkmyYdk1sYUabsgsNhi3wktXQRgwm74LBJ6ecyafOZVLZWpMIauxZusQWBF21nJIk6OVWm7TKtuZp5eH8K3eqcGLM/NCmLW2TdhcyCyLSYdFLE5PV3dtBePiNDnbVH4f4DUTYhqK50XBcAAAAASUVORK5CYII="/>
            </defs>
            </svg>
          </IconButton>
        </MessageInput>
      </ChatContainer>
    </GroupesWithChat>
  );
};

export default Chat;

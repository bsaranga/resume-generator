import headshot from '../assets/headshot.png';
export default function Header() {
  return (
    <div className="flex gap-2">
      <img className="w-20 h-20" src={headshot} alt="headshot" />
      <div className='flex flex-col'>
        <div className='font-medium text-lg'>Saranga B</div>
        <div className='text-sm'>Senior Engineer (Full Stack) @ Nagarro</div>
        <div className='flex gap-1 text-xs'>
          <a href='https://saranga.dev'>https://saranga.dev</a>
          <a href='mailto:bsaranga@gmail.com'>bsaranga@gmail.com</a>
          <div>+94775008271</div>
        </div>
        <div className='text-xs'>40/16, Prime Villas 1, Abeyrathna Mw, Boralesgamuwa</div>
      </div>
    </div>
  );
}
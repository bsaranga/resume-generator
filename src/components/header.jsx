import data from '../../data/header.json';

export default function Header() {
  return (
    <div className="flex gap-2">
      <img className="w-20 h-20" src={data.headshot} alt="headshot" />
      <div className='flex flex-col'>
        <div className='font-medium text-lg'>{data.fullname}</div>
        <div className='text-sm'>{data.currentPosition}</div>
        <div className='flex gap-1 text-xs'>
          <a href={data.website}>{data.website}</a> |
          <a href={`mailto:${data.email}`}>{data.email}</a> |
          <div>{data.phone}</div>
        </div>
        <div className='text-xs'>{data.address}</div>
      </div>
    </div>
  );
}
export const ToggleSwitch: React.FC<{
  checked: boolean;
  onChange: (checked: boolean) => void;
}> = ({ checked, onChange }) => {
  return (
    <label className='relative inline-flex items-center cursor-pointer'>
      <input
        type='checkbox'
        className='sr-only peer'
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <div className='w-11 h-6 mr-60 bg-gray-200 rounded-full peer-checked:bg-[#009A49] transition-colors' />
      <span className='absolute w-4 h-4 bg-white rounded-full left-1 top-1 peer-checked:translate-x-5 transition-transform' />
    </label>
  );
};

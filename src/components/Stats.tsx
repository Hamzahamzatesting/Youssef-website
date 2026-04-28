const Stats = () => {
  const stats = [
    { label: 'Projects Completed', value: '150+' },
    { label: 'Years Experience', value: '5+' },
    { label: 'Client Satisfaction', value: '100%' },
  ];

  return (
    <div id="stats" className="border-y border-white/5 py-20 bg-brand-bg relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0">
          {stats.map((stat, i) => (
            <div 
              key={stat.label}
              className={`flex flex-col items-center text-center md:items-start md:text-left md:px-12 ${
                i !== stats.length - 1 ? 'md:border-r border-white/5' : ''
              }`}
            >
              <span className="serif text-6xl md:text-7xl text-brand-text mb-4 tracking-tighter">
                {stat.value}
              </span>
              <span className="text-[10px] uppercase tracking-[0.4em] text-brand-gold">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;

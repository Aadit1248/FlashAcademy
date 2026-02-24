import { getPlayers } from '@/lib/payload';

interface Player {
  id: string;
  fullName: string;
  dateOfBirth: string;
  profileImage?: string;
  achievements?: string;
  age?: number;
}

export async function Players() {
  let players: Player[] = [];
  
  try {
    const playersData = await getPlayers({ limit: 0 });
    players = playersData.docs as Player[];
  } catch (error) {
    console.error('Error fetching players:', error);
  }

  return (
    <section id="players" className="py-24 bg-gradient-to-b from-[#0a1628] via-[#0d1f3c] to-[#0a1628] relative overflow-hidden scroll-mt-16">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#CCFF00] rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[150px]" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-[#CCFF00]/20 text-[#CCFF00] text-sm font-semibold px-4 py-2 rounded-full mb-4">
            Our Champions
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Star Players
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Meet the talented athletes who train at Flash Sports Academy.
          </p>
        </div>

        {/* Players Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
          {players.length > 0 ? (
            players.map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center py-8">No players registered yet.</p>
          )}
        </div>
      </div>
    </section>
  );
}

function PlayerCard({ player }: { player: Player }) {
  // Get initials for placeholder
  const initials = player.fullName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  // Parse achievements into array
  const achievementsList = player.achievements 
    ? player.achievements.split(',').map(a => a.trim()).filter(Boolean).slice(0, 3)
    : [];

  // Random rating for FIFA-style display (based on name hash for consistency)
  const rating = 70 + (player.fullName.length % 25);

  return (
    <div className="group relative w-full max-w-[280px]">
      {/* Card Container with FIFA-style gradient border */}
      <div className="relative bg-gradient-to-b from-[#1a3a5c] to-[#0f2744] rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-105 hover:-translate-y-2">
        {/* Gold/Silver shine effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#CCFF00]/0 via-[#CCFF00]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Top Banner with Rating */}
        <div className="relative bg-gradient-to-r from-[#CCFF00] via-[#b8e600] to-[#CCFF00] p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-black text-[#1a472a]">{rating}</span>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-[#1a472a]/70 leading-tight">OVR</span>
                <span className="text-[10px] font-bold text-[#1a472a]/70 leading-tight">TENNIS</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-black text-[#1a472a]">{player.age || '—'}</div>
              <div className="text-[10px] font-bold text-[#1a472a]/70">AGE</div>
            </div>
          </div>
        </div>

        {/* Player Image Section */}
        <div className="relative h-48 bg-gradient-to-b from-[#1a3a5c] to-[#0f2744] flex items-center justify-center overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                transparent,
                transparent 10px,
                rgba(204, 255, 0, 0.1) 10px,
                rgba(204, 255, 0, 0.1) 20px
              )`
            }} />
          </div>
          
          {player.profileImage ? (
            <img 
              src={player.profileImage} 
              alt={player.fullName}
              className="w-full h-full object-cover"
            />
          ) : (
            /* Default Avatar Placeholder */
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-[#CCFF00]/20 rounded-full blur-xl scale-150" />
              {/* Avatar circle */}
              <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-[#CCFF00] to-[#8fb800] flex items-center justify-center shadow-lg">
                <span className="text-3xl font-bold text-[#1a472a]">{initials}</span>
              </div>
              {/* Tennis ball decoration */}
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#CCFF00] rounded-full flex items-center justify-center shadow-md">
                <span className="text-sm">🎾</span>
              </div>
            </div>
          )}
        </div>

        {/* Player Info */}
        <div className="p-4 bg-gradient-to-b from-[#0f2744] to-[#0a1c30]">
          {/* Name */}
          <h3 className="text-lg font-bold text-white text-center mb-3 truncate">
            {player.fullName}
          </h3>

          {/* Stats Bar */}
          <div className="flex justify-center gap-4 mb-4">
            <div className="text-center">
              <div className="text-[#CCFF00] font-bold text-sm">{player.age || '—'}</div>
              <div className="text-[10px] text-gray-400 uppercase tracking-wider">Age</div>
            </div>
            <div className="w-px bg-gray-600" />
            <div className="text-center">
              <div className="text-[#CCFF00] font-bold text-sm">{achievementsList.length}</div>
              <div className="text-[10px] text-gray-400 uppercase tracking-wider">Awards</div>
            </div>
            <div className="w-px bg-gray-600" />
            <div className="text-center">
              <div className="text-[#CCFF00] font-bold text-sm">⭐</div>
              <div className="text-[10px] text-gray-400 uppercase tracking-wider">Pro</div>
            </div>
          </div>

          {/* Achievements */}
          {achievementsList.length > 0 && (
            <div className="space-y-1.5">
              <div className="text-[10px] text-gray-500 uppercase tracking-wider text-center mb-2">
                Achievements
              </div>
              {achievementsList.map((achievement, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-1.5"
                >
                  <span className="text-[#CCFF00] text-xs">🏆</span>
                  <span className="text-xs text-gray-300 truncate">{achievement}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Accent Line */}
        <div className="h-1 bg-gradient-to-r from-transparent via-[#CCFF00] to-transparent" />
      </div>
    </div>
  );
}

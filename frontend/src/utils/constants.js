import { DONATION_TYPES } from '../../utils/constants';

// ... dakhél l-return ta3 PostForm
<div className="grid grid-cols-2 md:grid-cols-3 gap-3">
  {DONATION_TYPES.map((type) => (
    <button
      key={type.value}
      type="button"
      // 1. Send the 'value' to the state (food, clothes...)
      onClick={() => setFormData({ ...formData, donationType: type.value })}
      className={`p-3 border rounded-xl font-bold transition-all flex flex-col items-center justify-center gap-1 ${formData.donationType === type.value
          ? 'bg-[#f97316] text-white border-[#f97316] shadow-md'
          : 'bg-white text-gray-800 border-gray-200 hover:border-[#f97316]'
        }`}
    >
      {/* 2. Affichi l-Emoji w l-Label nishan */}
      <span className="text-xl">{type.emoji}</span>
      <span className="text-xs">{type.label.replace(type.emoji, '').trim()}</span>
    </button>
  ))}
</div>
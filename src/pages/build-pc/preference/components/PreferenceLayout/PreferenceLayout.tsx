
function PreferenceLayout() {
  return null
}

PreferenceLayout.HeadingTitle = function PreferenceLayoutHeadingTitle({text, subText}: {text: string, subText: string}) {
  return (
    <div className="mb-6">
      <h2 className="md:text-h2 text-M-h1 font-IntelOneDisplayBold max-w-[471px] md:mb-6 mb-3">
        {text}
      </h2>
      <p className="md:text-sm text-xs font-IntelOneBodyTextMedium">{subText}</p>
    </div>
  )
}

export default PreferenceLayout
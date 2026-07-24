export default function StructureViewer() {
  return (
    <div className="space-y-1">
      <p className="text-xs text-gray-500 italic">Skeletal structure — coming in Phase 2</p>
      <div className="text-xs font-mono text-gray-600 space-y-0.5 mt-2">
        <div className="text-gray-500">root_capsule</div>
        <div className="pl-3">├── mixamorigspine</div>
        <div className="pl-6">├── mixamorigspine1</div>
        <div className="pl-9">├── mixamorigspine2</div>
        <div className="pl-12">│   ├── mixamorigneck</div>
        <div className="pl-15">│   │   └── mixamorighead</div>
        <div className="pl-12">│   ├── left_shoulder → left_arm → left_forearm → left_hand</div>
        <div className="pl-12">│   └── right_shoulder → right_arm → right_forearm → right_hand</div>
        <div className="pl-3">├── left_upleg → left_leg → left_foot</div>
        <div className="pl-3">└── right_upleg → right_leg → right_foot</div>
      </div>
    </div>
  )
}

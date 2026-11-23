export type Skill = {
  name: string;
  group: "3D" | "AI" | "Post";
  level: number; // 0–100
  description: string;
};

export const skills: Skill[] = [
  { name: "3ds Max", group: "3D", level: 95, description: "Scene building, modelling and layout for interiors and exteriors." },
  { name: "Corona", group: "3D", level: 92, description: "Photoreal lighting and materials for still renders." },
  { name: "V-Ray", group: "3D", level: 88, description: "Production rendering for architectural and product work." },
  { name: "Unreal", group: "3D", level: 75, description: "Real-time walkthroughs and interactive presentations." },
  { name: "Blender", group: "3D", level: 70, description: "Fast modelling, look-dev and experiments." },
  { name: "ComfyUI", group: "AI", level: 90, description: "Node-based AI pipelines for controlled, repeatable image generation." },
  { name: "Stable Diffusion", group: "AI", level: 88, description: "Image generation, inpainting, ControlNet and custom models." },
  { name: "Midjourney", group: "AI", level: 85, description: "Concept exploration, mood boards and styling references." },
  { name: "AI Workflows", group: "AI", level: 95, description: "Designing hybrid 3D + AI production pipelines for scale and consistency." },
  { name: "Photoshop", group: "Post", level: 93, description: "Compositing, retouching and final grading." },
  { name: "Lighting", group: "3D", level: 94, description: "Mood, time of day and storytelling through light." },
  { name: "Compositing", group: "Post", level: 88, description: "Render passes, ID masks and seamless integration." },
];

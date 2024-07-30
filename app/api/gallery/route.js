import { promises as fs } from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'gallery.json');

export async function GET() {
  const fileContents = await fs.readFile(filePath, 'utf8');
  return new Response(fileContents, {
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(request) {
  const gallery = await request.json();
  await fs.writeFile(filePath, JSON.stringify(gallery, null, 2));
  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function PUT(request) {
  const newImage = await request.json();
  const fileContents = await fs.readFile(filePath, 'utf8');
  const gallery = JSON.parse(fileContents);
  gallery.push(newImage);
  await fs.writeFile(filePath, JSON.stringify(gallery, null, 2));
  return new Response(JSON.stringify({ success: true, id: newImage.id }), {
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function DELETE(request) {
  const { id } = await request.json();
  const fileContents = await fs.readFile(filePath, 'utf8');
  let gallery = JSON.parse(fileContents);
  gallery = gallery.filter(image => image.id !== id);
  await fs.writeFile(filePath, JSON.stringify(gallery, null, 2));
  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
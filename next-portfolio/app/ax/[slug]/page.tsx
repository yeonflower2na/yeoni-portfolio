import fs from 'node:fs/promises'
import path from 'node:path'
import AxPostView from './AxPostView'

/** 정적 내보내기 시 posts.json에 등록된 글만큼 페이지를 미리 만든다 */
export async function generateStaticParams() {
  const file = path.join(process.cwd(), 'public', 'ax', 'posts.json')
  const posts: { id: string }[] = JSON.parse(await fs.readFile(file, 'utf8'))
  return posts.map(post => ({ slug: post.id }))
}

export default async function AxPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <AxPostView slug={slug} />
}

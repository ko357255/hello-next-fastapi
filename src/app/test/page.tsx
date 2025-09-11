import Counter from '@/components/Counter';
import Image from 'next/image';

interface Dog {
  message: string;
  status: string;
}

// 'use client' を書かない場合は サーバーコンポーネント となる
// SSR で動く
export default async function Page() {
  const res = await fetch('https://dog.ceo/api/breeds/image/random');
  const data: Dog = await res.json();

  return (
    <div>
      <Image src={data.message} width={600} height={600} alt="犬の画像" />

      {/* サーバーコンポーネントの中に、クライアントコンポーネントを入れることもできる */}
      {/* サーバー > クライアント 〇 | クライアント > サーバー × */}
      <Counter />
    </div>
  );
}

import Card from 'src/components/pattern/compound/card';
import CardItem from 'src/components/pattern/compound/item';

const list = ['Google', 'Naver', 'Daum', 'amazon', 'instagram', 'github', 'firebase'];

export default function CompoundPage() {
  return (
    <Card>
      <Card.CardList>
        {list.map((v) => (
          <CardItem key={v} value={v} />
        ))}
      </Card.CardList>
      <Card.CardButton />
    </Card>
  );
}

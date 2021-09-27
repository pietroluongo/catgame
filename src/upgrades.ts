interface UpgradeItemData {
  title: string;
  description: string;
  icon: string;
  id: PossibleUpgrades;
}

export enum PossibleUpgrades {
  totalHealth,
  fireSpeed,
  moveSpeed,
  unknown,
  bulletSize,
  bulletSpeed,
  bulletDamage,
  bulletPenetration,
}

const upgradesList: Array<UpgradeItemData> = [
  {
    title: "Vida total",
    description: "Aumenta a sua vida total",
    icon: "test1",
    id: PossibleUpgrades.totalHealth,
  },
  {
    title: "Velocidade de disparo",
    description: "Reduz o intervalo entre disparos",
    icon: "test2",
    id: PossibleUpgrades.fireSpeed,
  },
  {
    title: "Velocidade de movimento",
    description: "Aumenta a velocidade de movimento",
    icon: "test3",
    id: PossibleUpgrades.moveSpeed,
  },
  {
    title: "???",
    description: "???",
    icon: "test4",
    id: PossibleUpgrades.unknown,
  },
  {
    title: "Tamanho do Cookie",
    description: "Aumenta o tamanho dos seus disparos",
    icon: "test5",
    id: PossibleUpgrades.bulletSize,
  },
  {
    title: "Velocidade do Cookie",
    description: "Aumenta a velocidade dos seus disparos",
    icon: "test6",
    id: PossibleUpgrades.bulletSpeed,
  },
  {
    title: "Dano do Cookie",
    description: "Aumenta o dano dos seus disparos",
    icon: "test7",
    id: PossibleUpgrades.bulletDamage,
  },
  {
    title: "Penetração do Cookie",
    description: "Aumenta quantos inimigos um único cookie seu pode acertar",
    icon: "test8",
    id: PossibleUpgrades.bulletPenetration,
  },
];

export default upgradesList;

interface UpgradeItemData {
  title: string;
  description: string;
  icon: string;
  id: PossibleUpgrades;
  enabled: boolean;
}

export enum PossibleUpgrades {
  totalHealth,
  fireSpeed,
  moveSpeed,
  dropChance,
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
    enabled: true,
  },
  {
    title: "Velocidade de disparo",
    description: "Reduz o intervalo entre disparos",
    icon: "test2",
    id: PossibleUpgrades.fireSpeed,
    enabled: false,
  },
  {
    title: "Velocidade de movimento",
    description: "Aumenta a velocidade de movimento",
    icon: "test3",
    id: PossibleUpgrades.moveSpeed,
    enabled: true,
  },
  {
    title: "Chance de Drop",
    description: "Aumenta a chance de um inimigo deixar um item",
    icon: "test4",
    id: PossibleUpgrades.dropChance,
    enabled: false,
  },
  {
    title: "Tamanho do Cookie",
    description: "Aumenta o tamanho dos seus disparos",
    icon: "test5",
    id: PossibleUpgrades.bulletSize,
    enabled: false,
  },
  {
    title: "Velocidade do Cookie",
    description: "Aumenta a velocidade dos seus disparos",
    icon: "test6",
    id: PossibleUpgrades.bulletSpeed,
    enabled: false,
  },
  {
    title: "Dano do Cookie",
    description: "Aumenta o dano dos seus disparos",
    icon: "test7",
    id: PossibleUpgrades.bulletDamage,
    enabled: false,
  },
  {
    title: "Penetração do Cookie",
    description: "Aumenta quantos inimigos um único cookie seu pode acertar",
    icon: "test8",
    id: PossibleUpgrades.bulletPenetration,
    enabled: false,
  },
];

export default upgradesList;

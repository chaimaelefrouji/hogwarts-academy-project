import type {
  Wizard, Spell, AcademyEvent, House, HousePoints, SpellOutput,
  ArrayElement, WizardSummary, WizardUpdate, AttackSpell,
  NonHealingCategory, SpellCategory, SpellCastEvent
} from "./types";
import { WizardRepository, SpellRepository } from "./repository";
import { Cache, Log } from "./decorators";

// Exercice 6 : vérifier que la maison fait partie des quatre maisons autorisées.
const validHouses: readonly House[] = [
  "Gryffindor", "Slytherin", "Ravenclaw", "Hufflepuff"
];

function isHouse(value: unknown): value is House {
  return typeof value === "string" &&
    validHouses.some(house => house === value);
}

function isWizard(value: unknown): value is Wizard {
  if (typeof value !== "object" || value === null) return false;

  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.id === "number" &&
    typeof candidate.name === "string" &&
    isHouse(candidate.house) &&
    typeof candidate.level === "number" &&
    typeof candidate.active === "boolean"
  );
}

class AcademyService {
  constructor(private readonly wizards: WizardRepository) {}

  @Log
  castSpell(event: SpellCastEvent): string {
    const wizard = this.wizards.findById(event.wizardId);
    if (!wizard) throw new Error("Wizard not found");
    return `${wizard.name} casts ${event.spellName}!`;
  }

  findByHouse(house: House): WizardSummary[] {
    return this.wizards.findByHouse(house)
      .map(({ id, name, house: wizardHouse }) => ({
        id, name, house: wizardHouse
      }));
  }

  updateWizard(id: number, changes: WizardUpdate): boolean {
    return this.wizards.update(id, changes);
  }

  getSpellEvents(events: AcademyEvent[]): SpellCastEvent[] {
    return events.filter(
      (event): event is SpellCastEvent => event.type === "spell-cast"
    );
  }
}

// Exercice 5 : méthode décorée pour illustrer le cache.
class SpellCalculator {
  @Cache
  calculatePower(basePower: number, multiplier: number): number {
    console.log("Calculating...");
    return basePower * multiplier;
  }
}

const wizards = new WizardRepository();
const spells = new SpellRepository();

console.log("\\n========== EXERCICE 1 : AJOUTER UN SORCIER ==========");
const harry = wizards.addWizard({
  name: "Harry Potter", house: "Gryffindor", level: 5, active: true
});
const hermione = wizards.addWizard({
  name: "Hermione Granger", house: "Gryffindor", level: 8, active: true
});
wizards.addWizard({
  name: "Draco Malfoy", house: "Slytherin", level: 6, active: true
});
console.log("Sorciers ajoutés avec ID automatique :", wizards.getAll());

console.log("\\n========== EXERCICE 2 : FILTRER PAR MAISON ==========");
console.log("Gryffindor :", wizards.findByHouse("Gryffindor"));

console.log("\\n========== EXERCICE 3 : EVENEMENTS DE SORTS ==========");
const events: AcademyEvent[] = [
  { type: "spell-cast", wizardId: harry.id, spellName: "Expelliarmus" },
  { type: "level-up", wizardId: hermione.id, newLevel: 9 },
  { type: "spell-cast", wizardId: hermione.id, spellName: "Lumos" },
  { type: "wizard-expelled", wizardId: 3 }
];
const academy = new AcademyService(wizards);
console.log("Événements spell-cast :", academy.getSpellEvents(events));
console.log(academy.castSpell({
  type: "spell-cast", wizardId: harry.id, spellName: "Expelliarmus"
}));

console.log("\\n========== EXERCICE 4 : VALIDATION PUISSANCE ==========");
spells.add({ id: 101, name: "Protego", category: "defense", power: 50 });
console.log("Sort valide ajouté :", spells.getAll());
try {
  spells.add({ id: 102, name: "Sort interdit", category: "attack", power: -10 });
} catch (error) {
  console.log("Sort refusé :", (error as Error).message);
}

console.log("\\n========== EXERCICE 5 : CACHE ==========");
const calculator = new SpellCalculator();
console.log("Résultat 1 :", calculator.calculatePower(10, 3));
console.log("Résultat 2 :", calculator.calculatePower(10, 3)); // cache HIT
console.log("Résultat 3 :", calculator.calculatePower(5, 2));  // cache MISS

console.log("\\n========== EXERCICE 6 : TYPE GUARD ==========");
const validData: unknown = {
  id: 10, name: "Luna Lovegood", house: "Ravenclaw", level: 5, active: true
};
const invalidData: unknown = {
  id: 11, name: "Viktor", house: "Durmstrang", level: 5, active: true
};
console.log("Donnée valide :", isWizard(validData));     // true
console.log("Donnée invalide :", isWizard(invalidData)); // false
console.log("Maison Durmstrang valide :", isHouse("Durmstrang")); // false

console.log("\\n========== AUTRES TYPES TYPESCRIPT ==========");
const points: HousePoints = {
  Gryffindor: 100, Slytherin: 80, Ravenclaw: 90, Hufflepuff: 70
};
console.log("Points des maisons :", points);

// Démonstrations de types demandées dans le support.
type CastResult = ReturnType<AcademyService["castSpell"]>;
type CastParameters = Parameters<AcademyService["castSpell"]>;
type AttackOutput = SpellOutput<"attack">;
type HealingOutput = SpellOutput<"healing">;
type SpellItem = ArrayElement<Spell[]>;
type AttackSpellExample = AttackSpell;
type RemainingCategories = NonHealingCategory;
type CategoryExample = SpellCategory;
const typeExamples: [
  CastResult, CastParameters, AttackOutput, HealingOutput,
  SpellItem, AttackSpellExample["category"], RemainingCategories,
  CategoryExample
] | null = null;
void typeExamples;

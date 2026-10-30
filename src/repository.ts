import type { Wizard, Spell, NewWizard, House } from "./types";
import { Log, MeasureTime, ValidateSpellPower } from "./decorators";

export class Repository<T extends { id: number }> {
  private items: T[] = [];

  @Log
  add(item: T): void {
    this.items.push(item);
  }

  @MeasureTime
  findById(id: number): T | undefined {
    return this.items.find(item => item.id === id);
  }

  getAll(): T[] {
    return [...this.items];
  }

  update(id: number, changes: Partial<T>): boolean {
    const item = this.findById(id);
    if (!item) return false;
    Object.assign(item, changes);
    return true;
  }
}

export class WizardRepository extends Repository<Wizard> {
  /** L'appelant ne fournit pas l'id : le repository le génère. */
  addWizard(newWizard: NewWizard): Wizard {
    const currentIds = this.getAll().map(wizard => wizard.id);
    const nextId = currentIds.length === 0 ? 1 : Math.max(...currentIds) + 1;

    const wizard = { ...newWizard, id: nextId } as Wizard;
    this.add(wizard);
    return wizard;
  }

  findByHouse(house: House): Wizard[] {
    return this.getAll().filter(wizard => wizard.house === house);
  }
}

export class SpellRepository extends Repository<Spell> {
  @ValidateSpellPower
  override add(spell: Spell): void {
    super.add(spell);
  }
}

export abstract class UnitUseCase<IN> {
  public abstract execute(anInput: IN): void;
}

export abstract class UseCase<IN, OUT> {
  public abstract execute(anInput: IN): OUT;
}

"use client";


type Props = {

  data: Record<string, unknown>;

  setData:
    React.Dispatch<
      React.SetStateAction<Record<string, unknown>>
    >;

  onNext: () => void;

  onBack: () => void;

};


/**
 * Étape 3 du wizard.
 *
 * Temps et instructions.
 */
export default function StepPreparation({
  onNext,
  onBack,
}: Props) {


  return (

    <div>

      <h2>
        Préparation
      </h2>


      <p>
        Étape en construction
      </p>


      <button
        type="button"
        onClick={onBack}
      >
        Retour
      </button>


      <button
        type="button"
        onClick={onNext}
      >
        Continuer
      </button>


    </div>

  );

}
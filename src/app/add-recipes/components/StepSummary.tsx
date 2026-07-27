"use client";


type Props = {

  data: Record<string, unknown>;

  onBack: () => void;

};


/**
 * Dernière étape du wizard.
 *
 * Résumé avant sauvegarde.
 */
export default function StepSummary({
  data,
  onBack,
}: Props) {


  return (

    <div>

      <h2>
        Résumé
      </h2>


      <pre>
        {
          JSON.stringify(
            data,
            null,
            2
          )
        }
      </pre>


      <button
        type="button"
        onClick={onBack}
      >
        Retour
      </button>


    </div>

  );

}
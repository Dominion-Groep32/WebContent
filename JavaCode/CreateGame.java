package JavaCode;

public class CreateGame {

	public static void main(String[] args) {
		// TODO Auto-generated method stub

		// GUI gui = new GUI();
		 //gui.GenerateCardsField();
		   //gui.GenerateCardsHand();
		  
		  GameActions test = new GameActions();
		  test.basicTurn(); // zorgt ervoor dat je 1 actie / 1 buy / 0 gp's hebt 
		  
		  
		  System.out.println("aantal coins is "+test.getCoins());
		  
		  
	}

}
